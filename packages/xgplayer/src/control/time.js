import Player from '../player'

let time = function () {
  let player = this; let util = Player.util
  let format = util.format
  let curtime = util.createDom('xg-time', `<div class="xgplayer-time-wapper"><span>${player.currentTime || format(0)}</span><em>${player.duration || format(0)}</em></div>`, {}, 'xgplayer-time'); let root = player.controls
  root.appendChild(curtime)
  let handle = function () {
    if (player.videoConfig.mediaType !== 'audio' || !player.isProgressMoving || !player.dash) {
      curtime.innerHTML = `<div class="xgplayer-time-wapper"><span>${format(player.currentTime || 0)}</span><em>${format(player.duration)}</em></div>`
    }
  }
  player.on('durationchange', handle)
  player.on('timeupdate', handle)

  function destroyFunc () {
    player.off('durationchange', handle)
    player.off('timeupdate', handle)
    player.off('destroy', destroyFunc)
  }
  player.once('destroy', destroyFunc)
}

Player.install('time', time)
