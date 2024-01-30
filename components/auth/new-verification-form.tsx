"use client";

import React, { useCallback, useEffect } from "react";
import CardWrapper from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

const NewVerificationForm = () => {
  // 
  const params = useSearchParams();
  const token = params.get('token');

  const onSubmit = useCallback(() => {
    console.log(token)
  }, [])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])


  return (
    <CardWrapper
      headLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
