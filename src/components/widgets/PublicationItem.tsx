'use client';
import { Calendar, ExternalLink, User } from 'lucide-react';
import { Link, Card, Image, Spinner } from '@nextui-org/react';
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/tooltip';
import { useRouter } from 'next/navigation';
interface PublicationItemProps {
  title: string;
  image: string;
  slug: string;
  publishDate: string;
  link: string;
  author: string[];
}

export const PublicationItem = ({ title, image, slug, publishDate, link, author }: PublicationItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const router = useRouter();
  return (
    <Card
      key={slug}
      className="flex flex-col md:flex-row overflow-hidden rounded-xl shadow-lg hover:shadow-none transition-all duration-500 p-5 md:p-2"
    >
      <div
        onClick={() => {
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          if (isMobile) {
            // todo: add mobile support pdf viewer
            router.push(link);
          } else {
            onOpen();
          }
        }}
        className="w-4/5 md:w-3/5 flex flex-col md:flex-row mx-auto md:m-auto items-center justify-center cursor-pointer"
      >
        <Image
          alt={title}
          isZoomed
          src={image}
          className="w-11/12 h-11/12 mx-auto md:w-[200px] md:h-[200px] p-10 md:p-1 !object-contain"
        />
      </div>
      <div className="w-full md:w-11/12 flex flex-col justify-between">
        <h2 className="text-md font-semibold ">{title}</h2>
        <div className="flex items-center gap-3 flex-wrap">
          {author.map((author, index) => (
            // <span className="text-xs mr-1 opacity-70">{author}</span>
            <Tooltip content={author} key={index}>
              <div className="w-5 h-5 border leading-5 text-center border-gray-200 rounded-full text-[10px] opacity-70 hover:bg-slate-600 hover:text-white" key={index}>
                {author
                  .split(' ')
                  .map((name) => name[0])
                  .join('')}
              </div>
            </Tooltip>
          ))}
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span className="text-xs">{publishDate}</span>
          </div>

          {/* <Link isExternal showAnchorIcon anchorIcon={<ExternalLink size={16} />} href={link} className="ml-1 text-xs">
            View
          </Link> */}
        </div>
      </div>
      <Modal isOpen={isOpen} size={'5xl'} onClose={onClose} scrollBehavior="inside" backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                {!isLoaded && <Spinner label="Loading..." />}
                <iframe
                  src={`/publications/${slug}.pdf#view=FitH,top&scrollbars=10&toolbar=0&statusbar=0`}
                  className="w-full h-[100vh]"
                  style={{
                    display: !isLoaded ? 'none' : 'block',
                  }}
                  onLoad={() => {
                    setIsLoaded(true);
                  }}
                ></iframe>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
};
