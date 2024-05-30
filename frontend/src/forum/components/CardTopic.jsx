import { CardTopicEdit, CardTopicInformation } from '@forum/views'
import { useState } from 'react'
import '@forum/styles/CardTopic.css'


export const CardTopic = ({ content, isOwner, refetch, setCommented }) => {
  const [editing, setEditing] = useState(false)

  return editing ? (
    <CardTopicEdit
      content={content}
      setEditing={setEditing}
      refetch={refetch}
    />
  ) : (
    <CardTopicInformation
      content={content}
      isOwner={isOwner}
      isComment={!content.title}
      setEditing={setEditing}
      setCommented={setCommented}
    />
  )
}
