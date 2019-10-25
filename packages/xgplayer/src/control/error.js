import Player from '../player'

let error = function () {
  let player = this; let util = Player.util; let error = util.createDom('hk-error', '<em class="hkplayer-error-text">请<span class="hkplayer-error-refresh">刷新</span>试试</em>', {}, 'hkplayer-error')
  player.root.appendChild(error)
  let text = error.querySelector('.hkplayer-error-text')
  let refresh = null
  let refreshListener = false

  function errorFunc () {
    // player.controls.style.display = 'none'
    if (player.error) {
      text.innerHTML = player.error
    } else {
      if (player.config.lang && player.config.lang === 'zh-cn') {
        text.innerHTML = `${player.lang.ERROR}，请<span class="hkplayer-error-refresh">刷新</span>试试`
      } else {
        text.innerHTML = `${player.lang.ERROR}，please try to <span class="hkplayer-error-refresh">refresh</span>`
      }
    }

    util.addClass(player.root, 'hkplayer-is-error')
    refresh = error.querySelector('.hkplayer-error-refresh')
    if (refresh && !refreshListener) {
      ['touchend', 'click'].forEach(item => {
        refresh.addEventListener(item, function (e) {
          e.preventDefault()
          e.stopPropagation()
          let p = e.target || e.srcElement
          if (p && p.tagName.toLocaleLowerCase() === 'span') {
            player.controls.style.display = 'flex'
            player.reload()
          }
        })
      })
      refreshListener = true
    }
  }
  player.on('error', errorFunc)

  function destroyFunc () {
    player.off('error', errorFunc)
    player.off('destroy', destroyFunc)
  }
  player.once('destroy', destroyFunc)
}

Player.install('error', error)
