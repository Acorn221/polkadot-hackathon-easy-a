/* eslint-disable */
"use client";

import { useEffect } from "react";

export const MsClarity = () => {
	useEffect(() => {
		(function(c,l,a,r,i,t,y){
			c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};// @ts-ignore
			t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;// @ts-ignore
			y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);// @ts-ignore
	})(window, document, "clarity", "script", "ml3dewr4sl");
	}, []);

	return null;
};