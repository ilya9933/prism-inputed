<template>
  <div :class='{"tabs__light": theme === "light", "tabs__dark": theme === "dark"}'>
    <ul class='tabs__header'>
      <li v-for='tab in tabs'
        :key='tab.id'
        @click.self='selectTab(tab.id)'
        :class='{"tab__selected": (tab.id == selectedId)}'>
        {{ tab.title }}
        <div class="tab__button-close" @click="$emit('close', tab.id)">
          <div class="button-close__cross"/>
        </div>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'light'
    }
  },
  data () {
    return {
      selectedId: 0,
      tabs: []
    }
  },
  mounted () {
    this.tabs = this.$children
    if (this.tabs && this.tabs.length) {
      this.selectTab(this.tabs[0].id)
    }
  },
  methods: {
    selectTab (i) {
      this.selectedId = i
      this.tabs.forEach((tab) => {
        tab.isActive = (tab.id === this.selectedId)
      })
    }
  }
}
</script>

<style lang="scss">
  .tab {
    display: inline-block;
    color: black;
    padding: 20px;
    box-sizing: border-box;
    min-width: 100%;
    height: 100%;
    overflow: scroll;

    &__button-close {
      @apply hidden;
      position: absolute;
      top: 20px;
      right: 12px;
      cursor: pointer;
      width: 12px;
      height: 12px;
    }
  }

  .tabs__header {
    display: flex;
    flex-wrap: nowrap;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: scroll;
    height: 60px;
    width: calc(100vw - 400px);
    box-sizing: border-box;

    & > li {
      padding: 15px 23px 15px 10px;
      border-radius: 10px;
      margin: 0;
      display: inline-block;
      margin-right: 5px;
      cursor: pointer;
      position: relative;
      min-width: 80px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &.tab__selected {
        font-weight: bold;
        border-radius: 10px 10px 0 0;
        border-bottom: 8px solid transparent;

        & .tab__button-close {
          @apply block;
        }
      }
    }
  }

  .tabs__light {
    height: calc(100% - 60px);

    & .tab{
      background-color: #fff;
    }

    & li {
      background-color: #ddd;
      color: #aaa;

      &.tab__selected {
        background-color: #fff;
        color: #2e2e2e;
      }
    }
  }

  .tabs__dark {
    height: calc(100% - 60px);

    & .tab{
      background-color: #555;
      color: #eee;
    }

    & li {
      background-color: #ddd;
      color: #aaa;

      &.tab__selected {
        background-color: #555;
        color: white;
      }
    }
  }

  .button-close__cross {
    @apply transition-all duration-1000 ease-in-out relative w-full h-full;

    &::before,
    &::after {
      content: "";
      height: 2px;
      width: 12px;
      margin: auto;
      @apply bg-black absolute rounded top-0 bottom-0 left-0 right-0;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
    &:hover {
      transform: rotate(180deg);
    }
  }
  
</style>