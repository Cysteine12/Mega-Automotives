<script setup>
defineProps({
  id: {
    type: String,
    default: 'promptModal',
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['confirmAction'])

const closeModal = () => {
  let body = document.getElementsByClassName('modal-open')[0]
  body.classList.toggle('modal-open')

  // <div class="modal-backdrop fade show"></div>
  let backdrop = document.getElementsByClassName('modal-backdrop')[0]
  backdrop.remove()

  let modal = document.getElementsByClassName('modal fade show')[0]
  modal.classList.toggle('show')
  modal.removeAttribute('role')
  modal.removeAttribute('aria-modal')
  modal.setAttribute('aria-hidden', true)
  modal.style.display = 'none'
}

const confirmModal = () => {
  closeModal()
  emit('confirmAction')
}
</script>

<template>
  <div
    class="modal fade"
    :id="id"
    role="dialog"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">{{ title }}</h5>
          <button
            type="button"
            class="close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">{{ message }}</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="closeModal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="confirmModal">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>
