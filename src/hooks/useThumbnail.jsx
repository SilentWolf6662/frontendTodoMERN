import { useState } from 'react'

export const useThumbnail = () => {
    const [thumbnail, setThumbnail] = useState(null)

    const makeThumbnail = async (file) => {
        // code to generate thumbnail
        if (!file) return <div>No file</div>
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') return <div>Invalid file type! Supported file types: png, jpeg, gif</div>
        let reader = new FileReader()
        reader.onload = (r) => {
            setThumbnail(r.target.result ) //<img src={r.target.result} width={'100'} alt='' />
        }
        reader.readAsDataURL(file)
    }

    return { thumbnail, makeThumbnail }
}