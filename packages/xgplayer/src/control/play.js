import Player from '../player'
import SVG from '../utils/svg'

let play = function () {
  let player = this
  let root = player.controls; let util = Player.util; let scale = player.config.iconScale || 0.0320625
  let iconPath = {
    play: 'M15.9,10.5L5.3,17.2c-0.6,0.4-1.3,0.2-1.7-0.4c-0.1-0.2-0.2-0.4-0.2-0.6V2.8c0-0.7,0.5-1.2,1.2-1.2,c0.2,0,0.5,0.1,0.6,0.2l10.6,6.7c0.6,0.4,0.7,1.1,0.4,1.7C16.2,10.3,16.1,10.4,15.9,10.5z',
    pause: 'M4.5,2.2A1.5,1.5,0,0,1,6,3.7v13a1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1,3,16.7V3.7A1.5,1.5,0,0,1,4.5,2.2Zm9,0A1.5,1.5,0,0,1,15,3.7v13a1.5,1.5,0,0,1-3,0V3.7A1.5,1.5,0,0,1,13.5,2.2Z'
  }
  let playBtn = player.config.playBtn ? player.config.playBtn : {}
  let btn, path, svg
  if (playBtn.type === 'img') {
    btn = Player.util.createImgBtn('play', playBtn.url.play, playBtn.width, playBtn.height)
  } else {
    btn = util.createDom('xg-play', `<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#fff" d="${iconPath.play}"></path>
          </svg></xg-icon>`, {}, 'xgplayer-play')
    path = btn.querySelector('path')
    svg = new SVG({
      progress: (shape, percent) => {
        path.setAttribute('d', svg.toSVGString(shape))
      },
      from: iconPath.pause,
      to: iconPath.play,
      duration: 50
    })
  }

  let tipsPlay = player.config.lang && player.config.lang === 'zh-cn' ? '播放' : 'Play'
  let tipsPause = player.config.lang && player.config.lang === 'zh-cn' ? '暂停' : 'Pause'
  let tips = util.createDom('xg-tips', tipsPlay, {}, 'xgplayer-tips')
  btn.appendChild(tips)

  let ev = ['click', 'touchstart']
  root.appendChild(btn)
  ev.forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      if (player.ended) {
        return
      }
      if (player.paused) {
        player.play()
      } else {
        player.pause()
      }
    }, false)
  })

  function playFunc () {
    if (playBtn.type === 'img') {
      btn.style.backgroundImage = `url("${playBtn.url.pause}")`
    } else {
      setTimeout(() => {
        tips.textContent = tipsPause
        if (svg.to !== iconPath.pause) {
          svg.reset(iconPath.pause, iconPath.play)
        }
      }, 80)
    }
  }
  player.on('play', playFunc)

  function pauseFunc () {
    if (playBtn.type === 'img') {
      btn.style.backgroundImage = `url("${playBtn.url.play}")`
    } else {
      setTimeout(() => {
        tips.textContent = tipsPlay
        if (svg.to !== iconPath.play) {
          svg.reset(iconPath.play, iconPath.pause)
        }
      }, 80)
    }
  }
  player.on('pause', pauseFunc)

  function destroyFunc () {
    player.off('play', playFunc)
    player.off('pause', pauseFunc)
    player.off('destroy', destroyFunc)
  }
  player.once('destroy', destroyFunc)
}

Player.install('play', play)
