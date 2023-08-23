import { List, ListItem, Text } from "@chakra-ui/react";
import { connect } from "frontity";
import { useEffect } from "react";
import { formatCPTData } from "../../helpers";

const SawteeInMedia = ({ state, actions, data, categories }) => {
  const media = state.source.get("/category/sawtee-in-media/");
  console.log(data, media);

  useEffect(() => {
    actions.source.fetch("/category/sawte-in-media/");
  });

  return (
    <List>
      <Text> Media list</Text>

      {media.isReady &&
        media.items.map((type, id) => {
          const post = formatCPTData(state, state.source[type][id], categories);
          console.log(post);
          return <ListItem key={post.id}> {post.title}</ListItem>;
        })}
    </List>
  );
};

export default connect(SawteeInMedia);
