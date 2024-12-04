<template>
  <div>
    <div class="d-flex mt-5">
      <div class="video-btn video-btn-xl bg--pink-400 ico-90" @click="showModal = true">
        <div class="video-block-wrapper"><span class="flaticon-play-button"></span></div>
      </div>
    </div>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content-cover"> 
        <span id="video-popup-close" class="close-button" @click="closeModal">X</span>
        <div class="modal-content">          
          <iframe
            width="680"
            height="315"
            :src="videoUrl"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
    export default {
      data() {
        return {
          showModal: false,
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your video URL
        };
      },
      methods: {
        closeModal() {
          this.showModal = false;
        },
      },
    };
  </script>
  
  <style scoped>
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .modal-content-cover {
      position: relative;
    }
    .modal-content {
      background-color: #fff;
      padding: 0px;
      border-radius: 10px;
      position: relative;
      max-width: 680px;
      border: 2px solid #000;
      overflow: hidden;   
    }
    @media only screen and (max-width: 475px) {
      .modal-content iframe {
        width: 320px !important;
        height: 250px !important;
      }
    }  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }
  #video-popup-close {
    cursor: pointer;
    position: absolute;
    right: -16px;
    top: -16px;
    z-index: 9999;
    width: 32px;
    height: 32px;
    border-radius: 25px;
    text-align: center;
    font-size: 16px;
    background-color: #ffffffc2;
    line-height: 32px;
    color: #000;
    opacity: 1 !important;
  }
  @media only screen and (max-width: 320px) {
    #video-popup-close {
      right: -10px;
      top: -10px;
      width: 20px;
      height: 20px;
      border-radius: 25px;
      font-size: 12px;
      line-height: 24px;
    }
  }
</style>
  