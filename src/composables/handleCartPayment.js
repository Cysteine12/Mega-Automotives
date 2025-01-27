import { usePaymentStore } from '@/stores/paymentStore'

const paymentStore = usePaymentStore()

export const handleCartPayment = async (cart) => {
  try {
    let availableCartItems = cart.items.filter((item) => {
      return item.inventory.status === 'Available'
    })

    const totalPrice = availableCartItems.reduce((pre, cur) => {
      return pre + cur.inventory.price * cur.quantity
    }, 0)

    const data = {
      amount: totalPrice,
      assignedTo: availableCartItems.map((item) => item.inventory._id),
      assignedToModel: 'Inventory',
    }

    await paymentStore.initializePayment(data)
  } catch (err) {
    console.error(err.message)
  }
}
