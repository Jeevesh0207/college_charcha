import React, { useState, useEffect, useRef,useMemo } from 'react';
import './StyleStats.css';

function Stats() {
    const Data = useMemo(()=>[
        {
            icon: 'fa-solid fa-users-line',
            count: 25,
            title: 'Current Staff',
            increment: 1,
        },
        {
            icon: 'fa-solid fa-user',
            count: 150,
            title: 'Happy Client',
            increment: 5,
        },
        {
            icon: 'fa-solid fa-book-open',
            count: 1500,
            title: 'Students Enrolled',
            increment: 50,
        },
        {
            icon: 'fa-solid fa-award',
            count: 2,
            title: 'Award Winning',
            increment: 1,
        },
    ],[])

    const [counts, setCounts] = useState(Data.map(() => 0));
    const [startCount, setStartCount] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const currentRef = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartCount(true);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );
    
        if (currentRef) {
            observer.observe(currentRef);
        }
    
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);
    

    useEffect(() => {
        if (startCount) {
            const intervalIds = Data.map((item, index) => {
                return setInterval(() => {
                    setCounts((prevCounts) => {
                        if (prevCounts[index] < item.count) {
                            const newCounts = [...prevCounts];
                            newCounts[index] += item.increment;
                            return newCounts;
                        }
                        return prevCounts;
                    });
                }, 50);
            });
    
            return () => intervalIds.forEach(clearInterval);
        }
    }, [startCount, Data]);
    

    return (
        <div className='Stats' ref={ref}>
            <div className='MaxBox'>
                {
                    Data.map((item, index) => (
                        <div className='item' key={index}>
                            <div className='Top'>
                                <i className={item.icon}></i>
                            </div>
                            <div className='Mid'>
                                <h1>{counts[index]}</h1>
                            </div>
                            <div className='Bottom'>
                                <p>{item.title}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Stats;
