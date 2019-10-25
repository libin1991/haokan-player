import Player from '../player'

let flex = function () {
  let player = this; let util = Player.util
  let playceholder = util.createDom('hk-placeholder', '', {}, 'hkplayer-placeholder')
  player.controls.appendChild(playceholder)
}

Player.install('__flex__', flex)
