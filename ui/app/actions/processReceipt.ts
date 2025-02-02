"use server"

export default async function processReceipt(formData: FormData) {
  try {
    const res = await fetch("https://groceries.zatti.tech/api/receipt/process", {
      method: "POST",
      body: formData,
      headers: {
        "X-API-KEY": "" //TODO Add this to .env file
      }
    })

    const jsonRes = await res.json()

    console.log(jsonRes)
  } catch (error) {
    console.error(error);
  }

}