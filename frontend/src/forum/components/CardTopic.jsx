import { CardTopicEdit, CardTopicInformation } from '@forum/views'
import '@forum/styles/CardTopic.css'


export const CardTopic = ({ content, isOwner }) => {
  return (
    <CardTopicInformation content={content} isOwner={isOwner} />
  )
}
