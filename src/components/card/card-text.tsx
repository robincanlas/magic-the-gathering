import Markdown from 'react-markdown'

const CardText = ({
  oracleText
}: { oracleText?: string }) => {
  return (
    <Markdown>
      {oracleText}
    </Markdown>
  )
}

export default CardText