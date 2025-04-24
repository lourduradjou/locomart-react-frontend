import React, { useState, useEffect } from 'react'
import PaymentCard from '../components/ui/PaymentCard'
import ProfileService from '../services/ProfileService'

const PaymentsPage = () => {
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const paymentsData = await ProfileService.getPaymentsData()
                setPayments(paymentsData)
            } catch (error) {
                console.error('Failed to load payments:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchPayments()
    }, [])

    return (
        <div className="payments-page">
            <h2>Payment History</h2>
            {loading ? (
                <p className="loader">Loading payments...</p>
            ) : payments.length > 0 ? (
                <div className="payments-container">
                    {payments.map((payment) => (
                        <PaymentCard key={payment.id} payment={payment} />
                    ))}
                </div>
            ) : (
                <p className="no-payments-message">No payments found.</p>
            )}
        </div>
    )
}

export default PaymentsPage
