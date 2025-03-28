<script setup>
import { getGeminiChat } from '@/composables/handleGeminiChat'
import { useUserStore } from '@/stores/userStore'
import { renderBase64Image } from '@/utils/imageFormatter'
import { computed, onMounted, ref } from 'vue'

const userStore = useUserStore()

const user = ref(null)
const imageFile = ref(null)
const fileInputRef = ref(null)
const chats = ref([])
const message = ref(null)

onMounted(() => {
  user.value = userStore.user
})

const triggerFileInput = () => {
  fileInputRef.value.click()
}

const handleFileInput = (e) => {
  imageFile.value = e.target.files[0]
}

const fileUrl = computed(() => URL.createObjectURL(imageFile.value))

const handleSubmit = async () => {
  if (!message.value) return
  const prompt = message.value
  const file = imageFile.value

  message.value = null
  imageFile.value = null

  await getGeminiChat(chats.value, prompt, file)
  setTimeout(() => {
    stickToButtom()
  }, 500)
}

const stickToButtom = () => {
  let element = document.getElementsByClassName('scroll-container')[0]
  element.scrollTop = element.scrollHeight
}
</script>

<template>
  <div class="row">
    <div class="col-lg-6">
      <div v-if="user" class="card" id="body">
        <div class="card-header msg_head">
          <div class="d-flex bd-highlight">
            <div class="img_cont">
              <img src="/megaautomotives.webp" class="rounded-circle user_img" />
              <span class="online_icon"></span>
            </div>
            <div class="user_info">
              <span>Chat with MegaBot</span>
              <p v-if="chats">{{ chats.length }} Messages</p>
            </div>
          </div>
        </div>

        <div v-if="chats.length > 0 && user" class="card-body scroll-container msg_card_body">
          <div v-for="chat in chats" :key="chat" class="my-1">
            <div v-if="chat.role === 'model'" class="d-flex justify-content-start mb-4 w-75">
              <div class="img_cont_msg">
                <img src="/megaautomotives.webp" class="rounded-circle user_img_msg" />
              </div>
              <div class="msg_cotainer">
                {{ chat.parts[0].text }}
              </div>
            </div>

            <div v-else class="d-flex justify-content-end mb-4">
              <div class="msg_cotainer_send">
                <div v-if="chat.parts.length > 1" class="mb-3">
                  <img
                    :src="renderBase64Image(chat.parts[1].inlineData)"
                    alt="Uploaded image"
                    height="150"
                  />
                </div>
                <div>{{ chat.parts[0].text }}</div>
              </div>
              <div class="img_cont_msg">
                <img :src="user.photo || '/img/user.png'" class="rounded-circle user_img_msg" />
                <span class="read_icon" title="Read">
                  <i class="fas fa-check-circle"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="card-body scroll-container msg_card_body">
          <span class="text-white">
            Hello there, start a conversation with MegaBot now.
            <br />
            Just upload a photo or send a message
            <i class="fas fa-laugh-wink"></i>
          </span>
        </div>

        <div class="card-footer">
          <form @submit.prevent="handleSubmit" class="form-bg-color input-group">
            <div v-if="imageFile" class="p-1 w-100">
              <div class="d-flex justify-content-end">
                <img :src="fileUrl" alt="" class="rounded" height="100" />
              </div>
            </div>
            <div @click="triggerFileInput" class="input-group-append" title="Upload photo">
              <button type="button" class="btn btn-none">
                <span class="input-group-text">
                  <i class="fas fa-camera"></i>
                </span>
              </button>

              <input
                v-show="false"
                type="file"
                accept="image/*"
                ref="fileInputRef"
                @change="handleFileInput"
              />
            </div>
            <textarea
              v-model="message"
              class="form-control type_msg"
              placeholder="Type your message..."
              required
            >
            </textarea>
            <button class="form-button input-group-append">
              <span class="input-group-text send_btn"><i class="far fa-paper-plane"></i></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#body,
.card-header,
.card-footer {
  background: #2e6699;
  background: -webkit-linear-gradient(to right, #2e6699, #2c4160, #0d102d);
  background: linear-gradient(to right, #2e6699, #2c4160, #0d102d);
}

.chat {
  margin-top: auto;
  margin-bottom: auto;
}
.card {
  height: 600px;
  border-radius: 15px !important;
  background-color: rgba(0, 0, 0, 0.4) !important;
  box-shadow: 0px 4px 10px gray;
}
.card-body {
  margin-bottom: 60px;
}
.msg_card_body {
  overflow-y: auto;
}
.card-header {
  border-radius: 15px 15px 0 0 !important;
  border-bottom: 1px solid #fff !important;
}
.card-footer {
  border-radius: 0 0 15px 15px !important;
  border-top: 0 !important;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.container {
  align-content: center;
}
.type_msg {
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: 0 !important;
  color: white !important;
  height: 60px !important;
  overflow-y: auto;
}
.type_msg:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.attach_btn {
  border-radius: 15px 0 0 15px !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: 0 !important;
  color: white !important;
  cursor: pointer;
}
.send_btn {
  border-radius: 0 15px 15px 0 !important;
  background-color: transparent !important;
  border: 0 !important;
  color: white !important;
  cursor: pointer;
}
.user_img {
  height: 70px;
  width: 70px;
  border: 1.5px solid #f5f6fa;
}
.user_img_msg {
  height: 40px;
  width: 40px;
  border: 1.5px solid #f5f6fa;
}
.img_cont {
  position: relative;
  height: 70px;
  width: 70px;
}
.img_cont_msg {
  position: relative;
  height: 40px;
  width: 40px;
}
.online_icon {
  position: absolute;
  height: 15px;
  width: 15px;
  background-color: #4cd137;
  border-radius: 50%;
  bottom: 0.2em;
  right: 0.4em;
  border: 1.5px solid white;
}
.read_icon {
  position: absolute;
  bottom: -8px;
  right: 0em;
  color: #4cd137;
  cursor: pointer;
}
.read_icon i {
  background: #fff;
  border-radius: 50%;
}
.user_info {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 15px;
}
.user_info span {
  font-size: 20px;
  color: white;
}
.user_info p {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
}
.msg_cotainer {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  border-radius: 15px;
  background-color: #0096bc;
  padding: 10px;
  position: relative;
  white-space: pre-line;
  color: #fff;
}
.msg_cotainer_send {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  border-radius: 15px;
  background-color: #82ccdd;
  padding: 10px;
  position: relative;
  white-space: pre-line;
  color: #fff;
}
.msg_time {
  position: absolute;
  left: 0;
  bottom: -15px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  white-space: nowrap;
}
.msg_time_send {
  position: absolute;
  right: 0;
  bottom: -15px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  white-space: nowrap;
}
.msg_head {
  position: relative;
}
#action_menu_btn {
  position: absolute;
  right: 10px;
  top: 10px;
  color: white;
  cursor: pointer;
  font-size: 20px;
}
.menu-toggle {
  display: none;
}
.action_menu {
  z-index: 2;
  position: absolute;
  padding: 15px 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 15px;
  top: 30px;
  right: 15px;
}
.action_menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.action_menu ul li {
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 5px;
  color: #fff;
}
.action_menu ul li i {
  padding-right: 10px;
}
.action_menu ul li:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
}

.form-bg-color {
  background: rgba(0, 0, 0, 0.3) !important;
  border-radius: 10px;
}
.form-button {
  appearance: none;
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 0.3) !important;
  display: block;
  padding: 10px 15px;
  border-radius: 0 8px 8px 0;
  color: #fff;
  font-weight: 700;
}
</style>
