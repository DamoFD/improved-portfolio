<script setup>
    import useStarsAnimation from '../composables/useStarsAnimation';

    const {canvas, tick } = useStarsAnimation();
</script>

<template>
    <canvas class="fixed top-0 left-0 w-full h-screen bg-[#232323]" ref="canvas"></canvas>
</template>
