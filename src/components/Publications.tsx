import { Metric, Subtitle, Card } from "@tremor/react";
import { useAppSelector } from "../store";
import Markdown from 'react-markdown';


export function Publications() {
  const publications = useAppSelector((state) => state.publications);

  return (
    <>
      {Object.entries(publications).map(([id, item]) => ( 
        <Card className="max-w-3xl mx-auto mb-2" key={id}> 
          <Metric>{item.user}</Metric>
          <Subtitle>{item.date}</Subtitle>

          <hr className="mt-4 mb-4" />

          <Markdown>{item.text}</Markdown>
        </Card>
      ))}
    </>
  );
}

