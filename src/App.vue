<script setup lang="ts">
import qrcode from 'qrcode-generator'
import Header from './components/Header.vue'
import TestImage from './assets/test.png?url'
import {CorrectionLevelPercentage} from './enum'
</script>

<script lang='ts'>
  export default {
    mounted() {
      console.log('mounted');
    },
    data() {
      return {
        message: ''
      }
    },
    methods: {
      generateQRCode() {
        // creates basic QR-Code
        const typeNumber = 4;
        let errorCorrectionLevel: ErrorCorrectionLevel = 'H';
        const qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData(this.message);
        qr.make();
        console.log(qr.createImgTag(5, 1));

        document.getElementById('qrcode').innerHTML = qr.createImgTag(5, 1);

        const qrcodeImg = document.getElementById('qrcode').firstChild as HTMLImageElement

        // add image above
        qrcodeImg.addEventListener('load', () => {
          const overlayImg = document.createElement('img')
          overlayImg.width = qrcodeImg.getBoundingClientRect().width * CorrectionLevelPercentage[errorCorrectionLevel]
          overlayImg.height = qrcodeImg.getBoundingClientRect().width * CorrectionLevelPercentage[errorCorrectionLevel]
          console.log(qrcodeImg.getBoundingClientRect().width * CorrectionLevelPercentage[errorCorrectionLevel]);

          overlayImg.classList.add('overlayimg')
          overlayImg.src = TestImage

          document.getElementById('qrcode').appendChild(overlayImg)
        })
      },
      downloadQRCode() {
        const bgImg = document.getElementById('qrcode').children.item(0) as HTMLImageElement
        const fgImg = document.getElementById('qrcode').children.item(1) as HTMLImageElement

        const canvas = document.createElement('canvas')
        canvas.width = bgImg.getBoundingClientRect().width
        canvas.height = bgImg.getBoundingClientRect().height

        const ctx = canvas.getContext("2d");

        ctx.drawImage(bgImg,
          0,
          0,
          bgImg.getBoundingClientRect().width,
          bgImg.getBoundingClientRect().height,
        )
        ctx.drawImage(
          fgImg,
          bgImg.getBoundingClientRect().width / 2 - fgImg.getBoundingClientRect().width / 2,
          bgImg.getBoundingClientRect().height / 2 - fgImg.getBoundingClientRect().height / 2,
          fgImg.getBoundingClientRect().width,
          fgImg.getBoundingClientRect().height,
        )

        const downloadLink = document.createElement('a')
        downloadLink.setAttribute('download', '')
        downloadLink.href = canvas.toDataURL("image/png")

        downloadLink.click()
      }
    },
  }
</script>

<template>
  <section>
    <Header />
    <input v-model="message" placeholder="edit me" />
    {{ message }}
    <div id="qrcode" />
    <button @click="generateQRCode">Generate</button>
    <button @click="downloadQRCode">Download</button>
  </section>
</template>

<style>
  #qrcode {
    display: table;
    position: relative;
  }

  #qrcode .overlayimg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
