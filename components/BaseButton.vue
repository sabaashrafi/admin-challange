<template>
  <b-button
    :type="nativeType"
    :disabled="disabled || loading"
    class="base-button"
    :variant="variant"
    :size="size"
    :block="block"
    @click="handleClick"
  >
    <slot name="loading">
      <!-- spinner loadin -->
      <b-spinner v-if="loading" small class="fas fa-spinner fa-spin" />
    </slot>
    <slot />
  </b-button>
</template>
<script>
// Base button component
export default {
  name: 'BaseButton',
  props: {
    round: Boolean,
    icon: Boolean,
    block: Boolean,
    loading: Boolean,
    wide: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: 'default',
      description: 'Button type (primary|secondary|danger etc)'
    },
    variant: {
      type: String,
      default: 'primary',
      description: 'Button variant (primary|secondary|danger etc)'
    },
    nativeType: {
      type: String,
      default: 'button',
      description: 'Button native type (e.g button, input etc)'
    },
    size: {
      type: String,
      default: '',
      description: 'Button size (sm|lg)'
    },
    outline: {
      type: Boolean,
      description: 'Whether button is outlined (only border has color)'
    },
    link: {
      type: Boolean,
      description: 'Whether button is a link (no borders or background)'
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
<style lang="scss">
  .base-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    i {
      padding: 0 3px;
    }
  }
</style>
