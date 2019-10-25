import Player from '../player'
import {getAbsoluteURL} from '../utils/url'
import downloadUtil from 'downloadjs'

const download = function () {
  const player = this
  if (!this.config.download) { return }
  let container = player.root
  let util = Player.util
  let downloadEl = util.createDom('hkplayer-download', `<hk-icon class="hkplayer-download-img"></hk-icon>`, {}, 'hkplayer-download')

  let root = player.controls
  root.appendChild(downloadEl)

  let tipsDownload = player.config.lang && player.config.lang === 'zh-cn' ? '下载' : 'Download'
  let tips = util.createDom('hk-tips', tipsDownload, {}, 'hkplayer-tips')
  downloadEl.appendChild(tips)

  player.download = function() {
    const url = getAbsoluteURL(player.config.url)
    downloadUtil(url)
  }
  downloadEl.addEventListener('click', (e) => {
    e.stopPropagation()
    // must pass an absolute url for download
    player.download();
  })

  downloadEl.addEventListener('mouseenter', (e) => {
    e.preventDefault()
    e.stopPropagation()
    tips.style.left = '50%'
    let rect = tips.getBoundingClientRect()
    let rootRect = container.getBoundingClientRect()
    if (rect.right > rootRect.right) {
      tips.style.left = `${-rect.right + rootRect.right + 16}px`
    }
  })
}

Player.install('download', download)
