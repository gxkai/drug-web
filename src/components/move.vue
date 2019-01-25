<template>
  <div
    class="move"
    @mousedown="down"
    @touchstart="down"
    @mousemove="move"
    @touchmove="move"
    @mouseup="end"
    @touchend="end"
    id="move"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        flags: false,
        pos: { x: 0, y: 0 },
        nx: '',
        ny: '',
        dx: '',
        dy: '',
        xPum: '',
        yPum: ''
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      // 实现移动端拖拽
      down() {
        let moveDiv = document.getElementById('move');
        this.flags = true;
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.pos.x = touch.clientX;
        this.pos.y = touch.clientY;
        this.dx = moveDiv.offsetLeft;
        this.dy = moveDiv.offsetTop;
      },
      move() {
        let moveDiv = document.getElementById('move');
        if (this.flags) {
          var touch;
          if (event.touches) {
            touch = event.touches[0];
          } else {
            touch = event;
          }
          this.nx = touch.clientX - this.pos.x;
          this.ny = touch.clientY - this.pos.y;
          this.xPum = this.dx + this.nx;
          this.yPum = this.dy + this.ny;
          moveDiv.style.left = this.xPum + 'px';
          moveDiv.style.top = this.yPum + 'px';
          document.addEventListener(
            'touchmove',
            function () {
              event.preventDefault();
            },
            false
          );
        }
      },
      end() {
        this.flags = false;
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  .move {
    position: fixed;
    bottom: 100px;
    right: 0;
    z-index: 999;
    text-align: center;
    width: 200px;
  }
</style>
