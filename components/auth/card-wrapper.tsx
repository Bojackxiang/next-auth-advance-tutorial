"use client";

import React, { PropsWithChildren } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import Header from "./header";
import Social from "./Social";
import BackButton from "./back-button";

interface CardWrapperProps extends PropsWithChildren {
  headLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headLabel} />
      </CardHeader>
      
      <CardContent>{children}</CardContent>

      {
        showSocial && <CardFooter>
          <Social/>
        </CardFooter>
      }

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref}/>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
