import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { PostItem } from "../molcules/PostItem";
import { EditForm } from "../organisms/EditForm";
import { useAllImages } from "../../hooks/useAllImages";
import { useCallback } from "react";
import { useAllParks } from "../../hooks/useAllParks";

export const PostEdit = () => {
  const { posts, handleGetPosts } = useAllImages();
  const { parks, parkOptions } = useAllParks();

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [isShiftDown, setIsShiftDown] = useState(false);

  const keydownHandler = (e) => {
    if (e.key === "Shift") {
      setIsShiftDown(true);
    }
  };
  const keyupHandler = (e) => {
    if (e.key === "Shift") {
      setIsShiftDown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("keyup", keyupHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
      document.removeEventListener("keyup", keyupHandler);
    };
  }, []);

  const idToIndex = useCallback(
    (id) => {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === id) {
          return i;
        }
      }
    },
    [posts]
  );

  const fill = (a, b) => {
    const array = [];
    const start = Math.min(a, b);
    const last = Math.max(a, b);
    for (let i = start; i <= last; i++) {
      array.push(i);
    }
    return array;
  };

  //画像選択追加
  const handleSelect = useCallback(
    (post) => {
      const lastSelectedIndex = selectedIndexes[selectedIndexes.length - 1];

      if (!isShiftDown || lastSelectedIndex === undefined) {
        setSelectedIndexes((indexes) => [...indexes, idToIndex(post.id)]);
        return;
      }
      const selectedIndex = idToIndex(post.id);
      const selectedIndexRange = fill(selectedIndex, lastSelectedIndex);
      setSelectedIndexes((indexes) => [...indexes, ...selectedIndexRange]);
    },
    [isShiftDown, selectedIndexes, idToIndex]
  );

  //画像選択解除
  const handleRemove = useCallback(
    (post) => {
      if (!isShiftDown) {
        setSelectedIndexes((indexes) =>
          indexes.filter((index) => index !== idToIndex(post.id))
        );
        return;
      }

      const lastSelectedIndex = selectedIndexes[selectedIndexes.length - 1];
      const selectedIndex = idToIndex(post.id);
      const selectedIndexRange = fill(selectedIndex, lastSelectedIndex);

      setSelectedIndexes((indexes) =>
        indexes.filter((index) => selectedIndexRange.includes(index))
      );
    },
    [isShiftDown, selectedIndexes, idToIndex]
  );

  //selectedIndexesの内容をselectedIdsにする
  useEffect(() => {
    setSelectedIds(
      selectedIndexes.map((selectedIndexes) => posts[selectedIndexes].id)
    );
  }, [selectedIndexes, posts]);

  return (
    <>
      <Grid container direction="row">
        <Grid item xs={9} sx={{ pl: 2 }}>
          {posts?.map((post) => {
            // console.log(post.id, selectedIndexes.includes(idToIndex(post.id)));
            return (
              <PostItem
                key={post.id}
                post={post}
                handleSelect={() => {
                  handleSelect(post);
                }}
                handleRemove={() => {
                  handleRemove(post);
                }}
                checked={selectedIndexes.includes(idToIndex(post.id))}
                isCheckboxVisible={true}
                parks={parks}
              />
            );
          })}
        </Grid>
        <Grid item xs={3}>
          <EditForm
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            setSelectedIndexes={setSelectedIndexes}
            handleGetPosts={handleGetPosts}
            parkOptions={parkOptions}
          />
        </Grid>
      </Grid>
    </>
  );
};
