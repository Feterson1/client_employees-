import { Button, Card, Image, useDisclosure } from "@nextui-org/react"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { resetUser, selectCurrent } from "../../features/user/userSlice"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/services/followApi"
import { useAppDispatch } from "../../app/hooks"
import { GoBack } from "../../components/go-back/goBack"
import { BASE_URL } from "../../constants"
import {
  MdOutlinePersonAddAlt,
  MdOutlinePersonAddDisabled,
} from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { ProfileInfoComponent } from "../../components/profile-info/profileInfo"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { CountInfoComponent } from "../../components/count-info/countInfo"

export const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useSelector(selectCurrent)
  const { data } = useGetUserByIdQuery(id ?? "")
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  const dispatch = useAppDispatch()
  useEffect(
    () => () => {
      dispatch(resetUser())
    },
    [],
  )

  if (!data) {
    return null
  }
  const handleFollow = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unfollowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap()
        await triggerGetUserByIdQuery(id)
        await triggerCurrentQuery()
      }
    } catch (error) {}
  }
  return (
    <>
      <GoBack />
      <div className="flex items-stretch gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                onClick={handleFollow}
                color={data.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt />
                  )
                }
              >
                {data.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            ) : (
              <Button endContent={<CiEdit />}>Редактировать</Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfoComponent title="Почта" info={data.email} />
          <ProfileInfoComponent title="Местоположение" info={data.location} />
          <ProfileInfoComponent
            title="Дата рождения"
            info={formatToClientDate(data.dateOfBirthday)}
          />
          <ProfileInfoComponent title="Обо мне" info={data.bio} />
          <div className="flex gap-2">
            <CountInfoComponent
              count={data.followers.length}
              title={"Подписчики"}
            />
            <CountInfoComponent
              count={data.following.length}
              title={"Подписки"}
            />
          </div>
        </Card>
      </div>
    </>
  )
}
