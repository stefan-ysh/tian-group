'use client';
import { Calendar, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, Image, Spinner } from '@nextui-org/react';
import { Slider } from '@nextui-org/slider';
import React, { forwardRef } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/tooltip';
import { useState, useRef } from 'react';
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
}

const ForwardedModalBody = forwardRef<HTMLDivElement, any>((props, ref) => (
  <ModalBody {...props} ref={ref} />
));

export const PublicationItem = ({ title, image, slug, publishDate, link, author }: PublicationItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const [value, setValue] = React.useState(0);
  const [scale, setScale] = React.useState(isMobile ? 0.5 : 1);
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
        <Image
          alt={title}
          isZoomed
          src={image}
          className="w-11/12 h-11/12 mx-auto md:w-[200px] md:h-[200px] p-10 md:p-1 !object-contain"
        />
      </div>
      <div className="w-full md:w-11/12 flex flex-col justify-between">
        <h2 className="text-md font-semibold ">{title}</h2>
        <div className="flex items-center gap-3 flex-wrap my-1">
          {author.map((author, index) =>
            isMobile ? (
              <span className="text-xs" key={index}>
                {author}
              </span>
            ) : (
              <Tooltip content={author} key={index}>
                <div
                  className="w-5 h-5 border leading-5 text-center border-gray-200 rounded-full text-[10px] opacity-70 hover:bg-slate-600 hover:text-white"
                  key={index}
                >
                  {author
                    .split(' ')
                    .map((name) => name[0])
                    .join('')}
                </div>
              </Tooltip>
            ),
          )}
        </div>
        {/* publish date */}
        <div className="flex items-center">
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
              <ModalHeader className="flex flex-col gap-1 text-sm">{value >= 100 ? title : ''}</ModalHeader>
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
                        minValue={isMobile ? 0.5 : 1}
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
