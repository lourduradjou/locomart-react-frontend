import axios from 'axios'

export const uploadImage = async (imageFile, setStatus) => {
    try {
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('upload_preset', 'Sei-coin-images')
        formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)

        //setStatus('Sending image to the server...','info')
        const res = await axios.post(import.meta.env.VITE_CLOUDINARY_BASE_URL, formData)

        const url = res.data.secure_url
        console.log('Image uploaded:', url)
        //setStatus('Image uploaded successfully','success')
        return url
    } catch (error) {
        console.error('Image upload failed:', error)
        setStatus(`Image upload failed: ${error.message}`, 'error')
        return ''
    }
}
