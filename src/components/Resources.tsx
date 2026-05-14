"use client";

import { Button, Spinner } from "@heroui/react";
import { useCallback, useEffect, useState, memo } from "react";

export interface ResourceProps {
  label: string;
  link: string;
}

const ResourceComponent = ({ label, link }: ResourceProps) => {
  const [status, setStatus] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkLinkStatus = useCallback(async (): Promise<void> => {
    if (link) {
      try {
        setIsLoading(true);
        const validateUrl = link.replace("/proxy/", "/validate/");
        const response = await fetch(validateUrl);
        const data = (await response.json()) as { status: number };
        setStatus(data.status);
      } catch {
        setStatus(500);
      } finally {
        setIsLoading(false);
      }
    } else {
      setStatus(undefined);
    }
  }, [link]);

  useEffect(() => {
    void checkLinkStatus();
  }, [checkLinkStatus]);

  const isOk = status === 200;
  const isDead = status === 404;

  const handleClick = useCallback(() => {
    if (isOk && link) {
      window.open(link);
    } else {
      console.error("A hivatkozás nem elérhető.");
    }
  }, [isOk, link]);

  return (
    <Button
      isDisabled={isLoading || (!isOk && !isDead)}
      isPending={isLoading}
      onPress={handleClick}
      className={`w-full h-11 text-sm font-semibold transition-colors data-[disabled=true]:opacity-50 ${isOk
        ? "bg-[#006FEE] hover:bg-[#005BC4] text-white"
        : isDead
          ? "bg-[#F31260]/20 hover:bg-[#F31260]/30 text-[#F31260] line-through"
          : "bg-[#27272a] hover:bg-[#3f3f46] text-zinc-400"
        }`}
    >
      {({ isPending }) => (
        <>
          {isPending && <Spinner size="sm" color="current" />}
          <span>{label}</span>
        </>
      )}
    </Button>
  );
};

export const Resource = memo(ResourceComponent);
