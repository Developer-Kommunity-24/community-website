export async function submitFormData(url: string, data: Record<string, string>) {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const response = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })

  return response
}