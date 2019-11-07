 
 


 
### Start

1. Install

    ```
    $ npm install xgplayer
    ```

2. Usage

    Step 1:

    ```html
    <div id="vs"></div>
    ```
    Step 2:

    ```js
    import Player from 'xgplayer';

    const player = new Player({
        id: 'vs',
        url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
    })
    ```

    This is the easiest way to configure the player, then it runs with video. For more advanced content, see the plug-in section or documentation. [more config](http://h5player.bytedance.com/en/config/)




### Plugins

xgplayer provides more plugins. Plugins are divided into two categories: one is self-starting, and another inherits the player's core class named xgplayer. In principle, the officially provided plug-ins are self-starting and the packaged third-party libraries are inherited. Some feature plug-ins themselves can provide a downgrade scenario that suggests a self-start approach, or an inheritance approach if not. The player supports custom plugins for more content viewing [plugins](http://h5player.bytedance.com/en/plugins/)

The following is how to use a self-starting plug-in：

```js
import Player from 'xgplayer';
import 'xgplayer-mp4';

const player = new Player({
    id: 'video',
    url: '//abc.com/test.mp4'
})
```

<code>xgplayer-mp4</code>plugin is self-starting, It loads mp4 video itself, parses mp4 format, implements custom loading, buffering, seamless switching, and so on. it will automatically downgrade devices that do not support [MSE](https://www.w3.org/TR/media-source/). [details](http://h5player.bytedance.com/en/plugins/#xgplayer-mp4)



### Mobile Support

xgplayer supports mobile terminal, but android device brand and system are numerous, there are much compatibility problems, the player provides whitelist mechanism to ensure the perfect operation in mobile terminal. [whitelist](http://h5player.bytedance.com/en/config/#whitelist)



### Dev

For debugging, we provide the example video resource which size is large in github. You can clone the whole git repository which includes codes and example videos with 'git clone --recurse-submodules -j8'. With 'git clone' you will pull only codes of xgplayer and its plugins.

```
$ git clone --recurse-submodules -j8 git@github.com:bytedance/xgplayer.git # OR git clone git@github.com:bytedance/xgplayer.git
$ cd xgplayer
$ npm install
$ npm run dev
```

please visit [http://localhost:9090/examples/index.html](http://localhost:9090/examples/index.html)


### License

[MIT](http://opensource.org/licenses/MIT)
