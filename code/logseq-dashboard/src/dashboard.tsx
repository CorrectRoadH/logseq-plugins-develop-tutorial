import React,{useEffect} from "react";
import "./dashboard.css"
import { useWindowSize } from "react-use";

function useIconPosition() {
    const windowSize = useWindowSize();
    return React.useMemo(() => {
        const right = windowSize.width - 10;
        const bottom = 20;
        return { right, bottom };
    }, [windowSize]);
}

// eslint-disable-next-line react/display-name
export const Dashboard = React.forwardRef<HTMLDivElement>(({}, ref) => {
    const { bottom, right } = useIconPosition();

    const [pageCount, setPageCount] = React.useState(0);
    useEffect(()=>{
        window.logseq.Editor.getAllPages().then(pages => {
            if (pages) {
                setPageCount(pages.length);
                }
            });
    },[])
    return(
        <div
            ref={ref}
            className="dashboard-root"
             style={{ left: right - 400, top: bottom + 80 }} // 这里80就是dashboard的高度。
            >
            <div className="center">
                <h1> 一共有 {pageCount} 个页面 </h1>
            </div>
        </div>
    );
});