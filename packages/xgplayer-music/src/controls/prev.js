import Player from '../music'

const prev = (player) => {
  const util = Player.util
  const controlEl = player.controls
  const ev = ['click', 'touchstart']
  let prevBtn = player.config.prevBtn ? player.config.prevBtn : {}
  let prev
  if (prevBtn.type === 'img') {
    prev = Player.util.createImgBtn('prev', prevBtn.url, prevBtn.width, prevBtn.height)
  } else {
    prev = util.createDom('xg-prev', `<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
              <path transform = "scale(0.025 0.025)"
              d="M600 1140v-768h128v352l320-320v704l-320-320v352zz"></path>
          </svg></xg-icon>`, {}, 'xgplayer-prev')
  }
  controlEl.appendChild(prev)

  ev.forEach(item => {
    prev.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.prev()
    }, false)
  })
}

Player.install('prev', prev)
