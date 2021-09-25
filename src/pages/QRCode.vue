<script setup lang="ts">
import qrcode from 'qrcode-generator'
import TestImage from '@/assets/test.png?url'
import { CorrectionLevelPercentage } from '../enum'
</script>

<script lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'

export default {
  name: 'QRCode',
  data() {
    return {
      message: '',
    }
  },
  components: { DefaultLayout },
  methods: {
    generateQRCode() {
      const qrcodeElement = document.getElementById('qrcode') as HTMLCanvasElement

      if (!qrcodeElement) return

      // creates basic QR-Code
      const typeNumber = 4
      let errorCorrectionLevel: ErrorCorrectionLevel = 'H'
      const qr = qrcode(typeNumber, errorCorrectionLevel)
      qr.addData(this.message)
      qr.make()
      console.log(qr.createImgTag(5, 1))

      qrcodeElement.innerHTML = qr.createImgTag(5, 1)

      const qrcodeImg = qrcodeElement.firstChild as HTMLImageElement

      // add image above
      qrcodeImg.addEventListener('load', () => {
        const overlayImg = document.createElement('img')
        overlayImg.width =
          qrcodeImg.getBoundingClientRect().width * CorrectionLevelPercentage[errorCorrectionLevel]
        overlayImg.height =
          qrcodeImg.getBoundingClientRect().width * CorrectionLevelPercentage[errorCorrectionLevel]
        console.log(
          qrcodeImg.getBoundingClientRect().width * CorrectionLevelPercentage[errorCorrectionLevel],
        )

        overlayImg.classList.add('overlayimg')
        overlayImg.src = TestImage

        qrcodeElement.appendChild(overlayImg)
      })
    },
    downloadQRCode() {
      const qrcodeElement = document.getElementById('qrcode') as HTMLCanvasElement

      if (!qrcodeElement) return

      const bgImg = qrcodeElement.children.item(0) as HTMLImageElement
      const fgImg = qrcodeElement.children.item(1) as HTMLImageElement

      const canvas = document.createElement('canvas')
      canvas.width = bgImg.getBoundingClientRect().width
      canvas.height = bgImg.getBoundingClientRect().height

      const ctx = canvas.getContext('2d')

      ctx?.drawImage(
        bgImg,
        0,
        0,
        bgImg.getBoundingClientRect().width,
        bgImg.getBoundingClientRect().height,
      )
      ctx?.drawImage(
        fgImg,
        bgImg.getBoundingClientRect().width / 2 - fgImg.getBoundingClientRect().width / 2,
        bgImg.getBoundingClientRect().height / 2 - fgImg.getBoundingClientRect().height / 2,
        fgImg.getBoundingClientRect().width,
        fgImg.getBoundingClientRect().height,
      )

      const downloadLink = document.createElement('a')
      downloadLink.setAttribute('download', '')
      downloadLink.href = canvas.toDataURL('image/png')

      downloadLink.click()
    },
  },
}
</script>

<template>
  <default-layout>
    <section>
      <input v-model="message" placeholder="edit me" />
      {{ message }}
      <div id="qrcode" />
      <button @click="generateQRCode">Generate</button>
      <button @click="downloadQRCode">Download</button>
    </section>
  </default-layout>
</template>

<style lang="stylus">
#qrcode
  display table
  position relative

  .overlayimg
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
</style>
