import Player from '../player'

let cssFullscreen = function () {
  let player = this; let util = Player.util
  let scale = 0.03
  if (!player.config.cssFullscreen) {
    return
  }
  let iconPath = {
    active: 'M9,10v1a.9.9,0,0,1-1,1,.9.9,0,0,1-1-1V9A.9.9,0,0,1,8,8h2a.9.9,0,0,1,1,1,.9.9,0,0,1-1,1Zm6,4V13a1,1,0,0,1,2,0v2a.9.9,0,0,1-1,1H14a1,1,0,0,1,0-2Zm3-7H6V17H18Zm2,0V17a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V7A2,2,0,0,1,6,5H18A2,2,0,0,1,20,7Z',
    default: 'M9,10V9a.9.9,0,0,1,1-1,.9.9,0,0,1,1,1v2a.9.9,0,0,1-1,1H8a.9.9,0,0,1-1-1,.9.9,0,0,1,1-1Zm6,4v1a1,1,0,0,1-2,0V13a.9.9,0,0,1,1-1h2a1,1,0,0,1,0,2Zm3-7H6V17H18Zm2,0V17a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V7A2,2,0,0,1,6,5H18A2,2,0,0,1,20,7Z'
  }
  let btn = util.createDom('hk-cssfullscreen', `<hk-icon class="hkplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="${iconPath.default}"></path>
        </svg></hk-icon>`, {}, 'hkplayer-cssfullscreen')
  let tipsFull = player.config.lang && player.config.lang === 'zh-cn' ? '网页全屏' : 'Full screen'
  let tipsExitFull = player.config.lang && player.config.lang === 'zh-cn' ? '退出网页全屏' : 'Exit full screen'
  let root = player.controls; let container = player.root
  let tips = util.createDom('hk-tips', tipsFull, {}, 'hkplayer-tips')
  let path = btn.querySelector('path')
  btn.appendChild(tips)
  let getFullscreen = function (el) {
    path.setAttribute('d', iconPath.active)
    tips.textContent = tipsExitFull
    util.addClass(el, 'hkplayer-cssfullscreen-active')
    util.addClass(document.body, 'overhidden')
  }
  let exitFullscreen = function (el) {
    path.setAttribute('d', iconPath.default)
    tips.textContent = tipsFull
    util.removeClass(el, 'hkplayer-cssfullscreen-active')
    util.removeClass(document.body, 'overhidden')
  }
  root.appendChild(btn);
  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      if (util.hasClass(container, 'hkplayer-cssfullscreen-active') || util.hasClass(container, 'hkplayer-is-fullscreen')) {
        exitFullscreen(container)
      } else {
        getFullscreen(container)
      }
    })
  })
    // 网页全屏退出
    document.onkeydown = function(ev) {
        const oEvent = ev || event;
        // Esc键的keyCode是27
        if (oEvent['keyCode'] !== 27) {
            return;
        }
        if (!util.hasClass(container, 'hkplayer-cssfullscreen-active')) {
            return;
        }
        exitFullscreen(container)
    };
}

Player.install('cssFullscreen', cssFullscreen)
