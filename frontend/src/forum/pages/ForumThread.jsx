import { useUser } from '@auth/hooks'
import { useGet, usePost } from '@common/hooks'
import { NotMatch } from '@common/pages'
import { TopicEdit, TopicInformation } from '@forum/views'
import { useState } from 'react'


export const ForumThread = () => {
  const [editing, setEditing] = useState(false)
  const [{ id: user_id, token }] = useUser()
  const topicId = location.pathname.split('/').pop()
  const [data, error] = useGet(
    `http://localhost:8080/api/v1/topics/${topicId}`,
    { Authorization: `Bearer ${token}` }
  )

  return error ? (
    <NotMatch />
  ) : editing ? (
    <TopicEdit callback={setEditing} />
  ) : (!!data &&
    <TopicInformation topic={data} 
      callback= {setEditing}
      isOwner={data.author.id === user_id}
    />
  )
}
