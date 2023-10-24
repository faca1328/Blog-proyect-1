import { Card, Subtitle, Title, Button } from "@tremor/react";
import { useAppSelector } from "../store";
import { useState } from "react";
import { User } from "../store/user/slice";
import { AuthActions } from "../hooks/authActions";


export function UserCard() {
  const users = useAppSelector((state) => state.users);
  const {followingUser} = AuthActions();


  const [follow, setFollow] = useState(false);

  const handleFollow = (id: User['id']) => {

    // Cambiar el estado local
    setFollow(!follow);

    // Despachar la acción 'followUser'
    followingUser(id)
  };

  return (
    <>
      {Object.entries(users).map(([id, item]) => (
        <Card className="flex mb-3 shadow-lg" key={id}>
          <img className="w-10 h-10 rounded-full mr-2 self-center" src={item.photo} alt={id} />
          <div>
            <Title>{item.name}</Title>
            <Subtitle>{item.userName}</Subtitle>
          </div>
          {follow ? (
            <Button
              size="xs"
              className="ml-auto h-9 self-center"
              onClick={() => handleFollow(item.id)}
              variant="secondary"
            >
              Unfollow
            </Button>
          ) : (
            <Button
              size="xs"
              className="ml-auto h-9 self-center"
              onClick={() => handleFollow(item.id)}
            >
              Follow
            </Button>
          )}
        </Card>
      ))}
    </>
  );
}

