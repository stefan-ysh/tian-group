'use client';
import { Calendar, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, SquareArrowOutUpRight, Book } from 'lucide-react';
import { Card, Spinner } from '@nextui-org/react';
import { Slider } from '@nextui-org/slider';
import React, { forwardRef } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Tooltip } from '@nextui-org/tooltip';
import { useState, useRef } from 'react';
import NextImage from 'next/image';
// react-pdf
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Progress } from '@nextui-org/react';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
interface PublicationItemProps {
  title: string;
  image: string;
  slug: string;
  publishDate: string;
  link: string;
  author: string[];
  journal: string;
}

const placeholderImage = 'data:image/png;base64,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';

const ForwardedModalBody = forwardRef<HTMLDivElement, any>((props, ref) => <ModalBody {...props} ref={ref} />);
ForwardedModalBody.displayName = 'ForwardedModalBody';

export const PublicationItem = ({ title, image, slug, publishDate, link, author, journal }: PublicationItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const [value, setValue] = React.useState(0);
  const [scale, setScale] = React.useState( 1);
  const ref = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  // total page num of pdf
  const [numPages, setNumPages] = useState<number>(1);
  // page num of pdf
  const [pageNumber, setPageNumber] = useState<number>(1);
  return (
    <Card
      key={slug}
      className="flex flex-col md:flex-row overflow-hidden rounded-xl shadow-lg hover:shadow-none transition-all duration-500 p-5 md:p-2 gap-5"
    >
      <div
        onClick={() => {
          onOpen();
        }}
        className="w-4/5 md:w-3/5 flex flex-col md:flex-row mx-auto md:m-auto items-center justify-center cursor-pointer"
      >
        <NextImage
          alt={title}
          src={image}
          width={200}
          height={200}
          placeholder='blur'
          blurDataURL={placeholderImage}
          className="w-11/12 h-11/12 mx-auto md:w-[200px] md:h-[200px] p-2 md:p-1 !object-contain"
        />
      </div>
      <div className="w-full md:w-11/12 flex flex-col justify-between">
        <h2 className="text-md font-semibold ">{title}</h2>
        <div className="flex items-center gap-3 flex-wrap my-4 sm:my-1">
          {author.map((author, index) =>
            isMobile ? (
              <span className="text-xs" key={index}>
                {author}
              </span>
            ) : (
              <Tooltip content={author} key={index}>
                <div className="leading-4 text-center opacity-60 hover:opacity-100" key={index}>
                  <Avatar color="primary" className="w-4 h-4 border border-primary p-1 hover:border-2">
                    <AvatarImage src="link" alt={author} />
                    <AvatarFallback>
                      <span className="text-[8px]">
                        {author
                          .split(' ')
                          .map((name) => name[0])
                          .join('')}
                      </span>
                    </AvatarFallback>
                  </Avatar>
                </div>
              </Tooltip>
            ),
          )}
        </div>
        {/* publish date */}
        <div className="flex items-center justify-between pr-1">
          <div className="flex items-center gap-1">
            <Book size={16} />
            <span className="text-xs">{journal}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span className="text-xs">{publishDate}</span>
          </div>
        </div>
      </div>
      {/* modal of preview pdf of publication */}
      <Modal isOpen={isOpen} size={'5xl'} onClose={onClose} scrollBehavior="inside" backdrop="blur" placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-sm">
                {value >= 100 ? (
                  <div className="flex items-center gap-1">
                    {/* title */}
                    <span>{title}</span>
                    {/* open link in new tab */}
                    <SquareArrowOutUpRight
                      onClick={() => window.open(link, '_blank')}
                      className="cursor-pointer"
                      size={16}
                    />
                  </div>
                ) : (
                  ''
                )}
              </ModalHeader>
              <ForwardedModalBody className="py-0 px-5 overflow-auto mb-10" ref={ref}>
                <Document
                  file={`/publications/${slug}.pdf`}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadProgress={({ loaded, total }) => {
                    setValue((loaded / total) * 100);
                  }}
                  loading={
                    <div className="w-full h-[300px] text-center leading-[300px]">
                      <Spinner color="warning" label="Loading..." />
                    </div>
                  }
                >
                  <Page
                    scale={scale}
                    pageNumber={pageNumber}
                    className="flex justify-center"
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    height={ref.current?.offsetHeight}
                    loading={
                      <div className="w-full h-[800px] text-center leading-[800px]">
                        <Spinner color="warning" label="Loading..." />
                      </div>
                    }
                  />
                </Document>
                {value < 100 && (
                  <Progress
                    className="max-w-full"
                    color="success"
                    aria-label="Loading..."
                    isStriped
                    showValueLabel={true}
                    size="md"
                    value={value}
                  />
                )}
                {value >= 100 && (
                  <ModalFooter className="absolute bottom-1 w-full flex justify-center items-center p-0">
                    <div className="flex justify-center items-center gap-2">
                      <Button onPress={() => setPageNumber(pageNumber - 1)} size="sm" isDisabled={pageNumber === 1}>
                        <ChevronLeft />
                      </Button>
                      <p className="whitespace-nowrap text-sm">
                        {pageNumber} of {numPages}
                      </p>
                      <Button
                        onPress={() => setPageNumber(pageNumber + 1)}
                        size="sm"
                        isDisabled={pageNumber === numPages}
                      >
                        <ChevronRight />
                      </Button>
                      <Slider
                        className="min-w-32"
                        // color="foreground"
                        aria-label="Loading..."
                        defaultValue={scale}
                        onChange={(value) => setScale(Number(value))}
                        maxValue={2}
                        minValue={1}
                        endContent={<ZoomIn />}
                        startContent={<ZoomOut />}
                        size="sm"
                        step={0.1}
                      />
                    </div>
                  </ModalFooter>
                )}
              </ForwardedModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
};
