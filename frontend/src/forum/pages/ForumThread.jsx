import { useUser } from '@auth/hooks'
import { useGet } from '@common/hooks'
import { NotMatch } from '@common/pages'
import { TopicEdit, TopicInformation } from '@forum/views'
import { useState } from 'react'


export const ForumThread = () => {
  const [editing, setEditing] = useState(false)
  const [{ token }] = useUser()
  const topicId = location.pathname.split('/').pop()
  const [data, error, , refetch] = useGet(
    `http://localhost:8080/api/topics/${topicId}`,
    { Authorization: `Bearer ${token}` }
  )

  return error ? (
    <NotMatch />
  ) : editing ? (
    <TopicEdit
      topic={data}
      setEditing={setEditing}
      refetch={refetch}
    />
  ) : (!!data &&
    <TopicInformation
      topic={data}
      callback={setEditing}
    />
  )
}
