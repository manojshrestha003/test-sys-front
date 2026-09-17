import React from 'react'
import { AdminLayout } from '@/app/layouts/AdminLayout'
import { QuestionSetLists } from '../components/QuestionSetLists'

const QuestionManagement: React.FC = () => {
  return (
    <AdminLayout>
      <QuestionSetLists />
    </AdminLayout>
  )
}

export default QuestionManagement