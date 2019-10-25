import Player from '../player'

let definition = function () {
  let player = this, util = Player.util, sniffer = Player.sniffer
  let ul = util.createDom('hk-definition', '', {tabindex: 3}, 'hkplayer-definition'), root = player.controls
  if (sniffer.device === 'mobile') {
    player.config.definitionActive = 'click'
  }
  let list = []
  function canplayDefiFunc () {
    let tmp = ['<ul>'], src = player.config.url, a = document.createElement('a')
    if (player.switchURL) {
      ['mp4', 'hls', '__flv__', 'dash'].every(item => {
        if (player[item]) {
          if(player[item].url) {
            a.href = player[item].url
          }
          if(item === '__flv__') {
            if(player[item]._options) {
              a.href = player[item]._options.url
            } else {
              a.href = player[item]._mediaDataSource.url
            }
          }
          src = a.href
          return false
        } else {
          return true
        }
      })
    } else {
      src = player.currentSrc || player.src
    }
    if(player['hls']) {
      a.href = player['hls'].url
      src = a.href
    }
    list.forEach(item => {
      a.href = item.url
      if (player.dash) {
        tmp.push(`<li url='${item.url}' cname='${item.name}' class='${item.selected ? 'definition' : ''}'>${item.name}</li>`)
      } else {
        tmp.push(`<li url='${item.url}' cname='${item.name}' class='${a.href === src ? 'definition' : ''}'>${item.name}</li>`)
      }
    })
    let cursrc = list.filter(item => {
      a.href = item.url
      if (player.dash) {
        return item.selected === true
      } else {
        return a.href === src
      }
    })
    tmp.push(`</ul><p class='name'>${(cursrc[0] || {name: ''}).name}</p>`)
    let urlInRoot = root.querySelector('.hkplayer-definition')
    if (urlInRoot) {
      urlInRoot.innerHTML = tmp.join('')
      let cur = urlInRoot.querySelector('.name')
      if (!player.config.definitionActive || player.config.definitionActive === 'hover') {
        cur.addEventListener('mouseenter', (e) => {
          e.preventDefault()
          e.stopPropagation()
          util.addClass(player.root, 'hkplayer-definition-active')
          urlInRoot.focus()
        })
      }
    } else {
      ul.innerHTML = tmp.join('')
      let cur = ul.querySelector('.name')
      if (!player.config.definitionActive || player.config.definitionActive === 'hover') {
        cur.addEventListener('mouseenter', (e) => {
          e.preventDefault()
          e.stopPropagation()
          util.addClass(player.root, 'hkplayer-definition-active')
          ul.focus()
        })
      }
      root.appendChild(ul)
    }
  }
  function resourceReadyFunc (listArr) {
    list = listArr
    if (list && list instanceof Array && list.length > 1) {
      util.addClass(player.root, 'hkplayer-is-definition')
      player.on('canplay', canplayDefiFunc)
    }
  }
  player.on('resourceReady', resourceReadyFunc);

  ['touchend', 'click'].forEach(item => {
    ul.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      let li = e.target || e.srcElement, a = document.createElement('a')
      if (li && li.tagName.toLocaleLowerCase() === 'li') {
        player.emit('beforeDefinitionChange', a.href)
        Array.prototype.forEach.call(li.parentNode.childNodes, item => {
          util.removeClass(item, 'definition')
        })
        if (player.dash) {
          list.forEach(item => {
            item.selected = false
            if (item.name === li.innerHTML) {
              item.selected = true
            }
          })
        }

        util.addClass(li, 'definition')
        li.parentNode.nextSibling.innerHTML = `${li.getAttribute('cname')}`
        a.href = li.getAttribute('url')
        if (player.switchURL) {
          let curRUL = document.createElement('a');
          ['mp4', 'hls', '__flv__', 'dash'].every(item => {
            if (player[item]) {
              if(player[item].url) {
                curRUL.href = player[item].url
              }
              if(item === '__flv__') {
                if(player[item]._options) {
                  curRUL.href = player[item]._options.url
                } else {
                  curRUL.href = player[item]._mediaDataSource.url
                }
              }
              return false
            } else {
              return true
            }
          })
          if (curRUL.href !== a.href && !player.ended) {
            player.switchURL(a.href)
          }
        } else {
          if (player['hls']) {
            let curRUL = document.createElement('a')
            curRUL = player['hls'].url
          }
          if (a.href !== player.currentSrc) {
            let curTime = player.currentTime, paused = player.paused
            if (!player.ended) {
              player.src = a.href
              player.once('canplay', function () {
                player.currentTime = curTime
                if (!paused) {
                  player.play()
                }
              })
            }
          }
        }
        player.emit('definitionChange', a.href)
        if (sniffer.device === 'mobile') {
          util.removeClass(player.root, 'hkplayer-definition-active')
        }
      } else if (player.config.definitionActive === 'click' && li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
        util.addClass(player.root, 'hkplayer-definition-active')
        ul.focus()
      }
      player.emit('focus')
    }, false)
  })

  ul.addEventListener('mouseleave', (e) => {
    e.preventDefault()
    e.stopPropagation()
    util.removeClass(player.root, 'hkplayer-definition-active')
  })

  function destroyFunc () {
    player.off('canplay', canplayDefiFunc)
    player.off('resourceReady', resourceReadyFunc);
    player.off('destroy', destroyFunc)
  }
  player.once('destroy', destroyFunc)
}

Player.install('definition', definition)