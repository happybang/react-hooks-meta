import React, { useEffect, useState } from 'react';
import {manager} from "./manager"
function design(value: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
        manager.getInstance().registDataType(value.code,target[propertyKey])

    };
}
 class main {
    constructor() {}
    @design({
        code:"usePerson"
    })
    usePerson(personId: string){
        const [loading, setLoading] = useState(true);
        const [person, setPerson] = useState({});
        useEffect(() => {
          setLoading(true);
          setPerson({
            name:"zhangsan"
          });
          setLoading(false);
        }, [personId]);
        return [loading, person];
    } 
}

export default new main();