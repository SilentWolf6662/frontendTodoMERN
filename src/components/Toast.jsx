import { useEffect, useState } from "react"

import { motion } from "framer-motion"

export const Toast = ({ title, description, duration }) => {
    const [active, setActive] = useState(false)
    const closeNotification = () => {
        setActive(false)
    }
    const showNotification = () => {
        setActive(true)
    }
    useEffect(() => {
        showNotification()
        setTimeout(() => {
            closeNotification()
        }, duration || 5000)
    }, [])
    return (
        <>
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: "10%",
                }}
                animate={{
                    opacity: active ? 1 : 0,
                    scale: active ? 1 : 0.8,
                    y: "0%",
                }}
                exit={{
                    opacity: 0,
                    scale: 0.8,
                    y: "10%",
                }}
            >
                <div className="alert alert-success text-gray-800">
                    <span className="font-bold">{title}</span>
                    <span>{description}</span>
                </div>

            </motion.div>
        </>
    )
}
