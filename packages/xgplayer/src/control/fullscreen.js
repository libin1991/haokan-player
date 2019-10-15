import Player from '../player'

let fullscreen = function () {
  let player = this; let util = Player.util
  let iconPath = {
    active: 'M5.5,7.5h2V5a.9.9,0,0,1,1-1,.9.9,0,0,1,1,1V7.5a2,2,0,0,1-2,2H5a.9.9,0,0,1-1-1,.9.9,0,0,1,1-1Zm13,0H19a.9.9,0,0,1,1,1,.9.9,0,0,1-1,1H16.5a2,2,0,0,1-2-2V5a1,1,0,0,1,2,0V7.5Zm-13,9H5a1,1,0,0,1,0-2H7.5a2,2,0,0,1,2,2V19a.9.9,0,0,1-1,1,.9.9,0,0,1-1-1V16.5Zm13,0h-2V19a1,1,0,0,1-2,0V16.5a2,2,0,0,1,2-2H19a1,1,0,0,1,0,2Z',
    default: 'M8,6H6V8.5a.9.9,0,0,1-1,1,.9.9,0,0,1-1-1V6A2,2,0,0,1,6,4H8.5a.9.9,0,0,1,1,1,.9.9,0,0,1-1,1Zm8,0h-.5a.9.9,0,0,1-1-1,.9.9,0,0,1,1-1H18a2,2,0,0,1,2,2V8.5a1,1,0,0,1-2,0V6ZM8,18h.5a1,1,0,0,1,0,2H6a2,2,0,0,1-2-2V15.5a.9.9,0,0,1,1-1,.9.9,0,0,1,1,1V18Zm8,0h2V15.5a1,1,0,0,1,2,0V18a2,2,0,0,1-2,2H15.5a1,1,0,0,1,0-2Z'
  }
  let btn = util.createDom('hk-fullscreen', `<hk-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="${iconPath.default}"></path>
        </svg></-icon>`, {}, 'hkplayer-fullscreen')
  let tipsFull = player.config.lang && player.config.lang === 'zh-cn' ? '全屏' : 'Full screen'
  let tipsExitFull = player.config.lang && player.config.lang === 'zh-cn' ? '退出全屏' : 'Exit full screen'
  let root = player.controls; let container = player.root
  let tips = util.createDom('hk-tips', tipsFull, {}, 'xgplayer-tips')
  let path = btn.querySelector('path')
  btn.appendChild(tips)
  let getFullscreen = function (el) {
    let cssfullscreenDom = util.findDom(player.controls, 'hk-cssfullscreen')
    if(cssfullscreenDom) {
      cssfullscreenDom.style.display = 'none'
    }
    path.setAttribute('d', iconPath.active)
    tips.textContent = tipsExitFull
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    } else if (player.video.webkitSupportsFullscreen) {
      player.video.webkitEnterFullscreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    } else {
      util.addClass(el, 'hkplayer-fullscreen-active')
    }
  }
  let exitFullscreen = function (el) {
    let cssfullscreenDom = util.findDom(player.controls, 'hk-cssfullscreen')
    let iconPath = {
      default: 'M9,10v1a.9.9,0,0,1-1,1,.9.9,0,0,1-1-1V9A.9.9,0,0,1,8,8h2a.9.9,0,0,1,1,1,.9.9,0,0,1-1,1Zm6,4V13a1,1,0,0,1,2,0v2a.9.9,0,0,1-1,1H14a1,1,0,0,1,0-2Zm3-7H6V17H18Zm2,0V17a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V7A2,2,0,0,1,6,5H18A2,2,0,0,1,20,7Z'
    }
    if(cssfullscreenDom) {
      let cssfullscreentTip = util.findDom(cssfullscreenDom, 'hk-tips')
      let path = cssfullscreenDom.querySelector('path')
      cssfullscreenDom.style.display = 'block'
      cssfullscreentTip.textContent = player.config.lang && player.config.lang === 'zh-cn' ? '网页全屏' : 'Full screen'
      path.setAttribute('d', iconPath.default)
    }
    util.removeClass(el, 'hkplayer-cssfullscreen-active')
    util.removeClass(document.body, 'overhidden')
    path.setAttribute('d', iconPath.default)
    tips.textContent = tipsFull
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else {
      util.removeClass(el, 'hkplayer-fullscreen-active')
    }
  }
  root.appendChild(btn);
  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      if (util.hasClass(container, 'hkplayer-fullscreen-active') || util.hasClass(container, 'hkplayer-is-fullscreen')) {
        exitFullscreen(container)
      } else {
        getFullscreen(container)
      }
    })
  })
  player.video.addEventListener('webkitendfullscreen', () => {
    player.emit('exitFullscreen')
    path.setAttribute('d', iconPath.default)
  })
  
  let fullsrceenChangeEv = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange']
  fullsrceenChangeEv.forEach(item => {
    document.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      if (!document.fullscreenElement &&!document.webkitIsFullScreen &&!document.mozFullScreen &&!document.msFullscreenElement) { 
        let cssfullscreenDom = util.findDom(player.controls, 'hk-cssfullscreen')
        let iconPath = {
          default: 'M9,10v1a.9.9,0,0,1-1,1,.9.9,0,0,1-1-1V9A.9.9,0,0,1,8,8h2a.9.9,0,0,1,1,1,.9.9,0,0,1-1,1Zm6,4V13a1,1,0,0,1,2,0v2a.9.9,0,0,1-1,1H14a1,1,0,0,1,0-2Zm3-7H6V17H18Zm2,0V17a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V7A2,2,0,0,1,6,5H18A2,2,0,0,1,20,7Z'
        }
        if(cssfullscreenDom) {
          let cssfullscreentTip = util.findDom(cssfullscreenDom, 'hk-tips')
          let path = cssfullscreenDom.querySelector('path')
          cssfullscreenDom.style.display = 'block'
          cssfullscreentTip.textContent = player.config.lang && player.config.lang === 'zh-cn' ? '网页全屏' : 'Full screen'
          path.setAttribute('d', iconPath.default)
        }
        util.removeClass(container, 'hkplayer-cssfullscreen-active')
        util.removeClass(document.body, 'overhidden')
        path.setAttribute('d', iconPath.default)
        tips.textContent = tipsFull
        util.removeClass(container, 'hkplayer-fullscreen-active')
      }
    })
  })

  let handle = function (e) {
    let fullscreenEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
    if (fullscreenEl && fullscreenEl === container) {
      util.addClass(container, 'hkplayer-is-fullscreen')
      path.setAttribute('d', iconPath.active)
      tips.textContent = tipsExitFull
      player.emit('requestFullscreen')
    } else {
      util.removeClass(container, 'hkplayer-is-fullscreen')
      path.setAttribute('d', iconPath.default)
      tips.textContent = tipsFull
      player.emit('exitFullscreen')
    }
  }

  btn.addEventListener('mouseenter', (e) => {
    e.preventDefault()
    e.stopPropagation()
    tips.style.left = '50%'
    let rect = tips.getBoundingClientRect()
    let rootRect = container.getBoundingClientRect()
    if (rect.right > rootRect.right) {
      tips.style.left = `${-rect.right + rootRect.right + 16}px`
    }
  });

  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
    document.addEventListener(item, handle)
  })

  function destroyFunc () {
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
      document.removeEventListener(item, handle)
    })
    player.off('destroy', destroyFunc)
  }
  player.once('destroy', destroyFunc)
}

Player.install('fullscreen', fullscreen)
