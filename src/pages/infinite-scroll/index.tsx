import {useState} from 'react';
import InfiniteScroll  from "react-infinite-scroller"
import {List} from "postcss/lib/list";

type ListItem = {
    page: number
    numbers: number[]
}

export default function Index() {
    const [list, setList] = useState<ListItem[]>([]);          //表示するデータ
    const [hasMore, setHasMore] = useState(true);  //再読み込み判定

    //項目を読み込むときのコールバック
    const loadMore = async (page: number) => {

        const response = await fetch(`http://localhost:3000/api/hello?page=${page}`);  //API通信
        const data = await response.json() as ListItem;  // 取得データ



        //データ件数が0件の場合、処理終了
        if (data.numbers.length < 1) {
            setHasMore(false);
            return;
        }

        if (page !== 1) {
            // 例えばpage 2を取得した時 page 1を削除したい
            const deleteTargetIndex = data.page - 1;

            const newList = [...list, data]

            const filteredNewList = newList.filter(item => item.page === deleteTargetIndex)

            setList(filteredNewList);
        }

        if (page === 1) {
            setList([...list, data]);
        }

        console.log(list)
    }

    //各スクロール要素
    const items = (listItem: ListItem): JSX.Element => {
        return (
            <ul>
                {listItem.numbers.map(number => {
                    return <li key={number}>{number}</li>
                })}
            </ul>
        )
    }


    //全体のスタイル
    const root_style = {
        marginLeft : "50px",
        marginTop : "50px",
    }

    //ロード中に表示する項目
    const loader =<div className="loader" key={0}>Loading ...</div>;

    return (
        <div style={root_style}>
            <InfiniteScroll
                loadMore={loadMore}
                hasMore={hasMore}
                loader={loader}
            >
                {
                    list.map(listItem => {
                        return items(listItem)
                    })
                }
            </InfiniteScroll>
        </div>
    )
}