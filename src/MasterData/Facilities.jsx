import React from 'react'
import TableTemplate from '../stories/TableTemplate'

const Facilities = () => {
  return (
    <TableTemplate
  columns={[
    {
      key: 'name',
      title: 'Name',
      width: '200px'
    },
    {
      key: 'email',
      title: 'Email'
    },
    {
      align: 'center',
      key: 'role',
      title: 'Role'
    },
    {
      align: 'center',
      key: 'status',
      title: 'Status',
      type: 'badge'
    },
    {
      align: 'center',
      key: 'lastLogin',
      title: 'Last Login'
    }
  ]}
  data={[
    {
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      email: 'john@example.com',
      id: 1,
      lastLogin: '2024-01-15',
      name: 'John Doe',
      role: 'Admin',
      status: 'active'
    },
    {
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
      email: 'jane@example.com',
      id: 2,
      lastLogin: '2024-01-10',
      name: 'Jane Smith',
      role: 'User',
      status: 'pending'
    },
    {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      email: 'mike@example.com',
      id: 3,
      lastLogin: '2024-01-05',
      name: 'Mike Johnson',
      role: 'Moderator',
      status: 'inactive'
    },
    {
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      email: 'sarah@example.com',
      id: 4,
      lastLogin: '2024-01-14',
      name: 'Sarah Wilson',
      role: 'User',
      status: 'active'
    },
    {
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=32&h=32&fit=crop&crop=face',
      email: 'alex@example.com',
      id: 5,
      lastLogin: '2024-01-12',
      name: 'Alex Chen',
      role: 'Developer',
      status: 'active'
    }
  ]}
  exportable
  pagination
  searchable
  title="User Management"
/>
  )
}

export default Facilities