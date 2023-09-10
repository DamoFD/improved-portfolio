<script setup>
    import useStarsAnimation from '../composables/useStarsAnimation';

    const {canvas, tick } = useStarsAnimation();
</script>

<template>
    <section class="w-full h-screen flex items-center justify-center" id="hero">
        <canvas class="fixed top-0 left-0 w-full h-screen bg-[#232323]" ref="canvas"></canvas>
        <h1 class="font-mont font-extrabold text-5xl text-white z-[2]">Damion Voshall</h1>
    </section>
</template>
