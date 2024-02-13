"use client"

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"
import { PlusIcon, BarsArrowUpIcon, ArrowPathIcon, ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";


const CompanyLogoFinder = () => {
  const [companyUrls, setCompanyUrls] = useState<string[]>(['']);

  const generateUrls = (companyUrl: string) => {
    if (companyUrl) {
      const clearbitUrl = `https://logo.clearbit.com/${companyUrl}`;
      return `${clearbitUrl}?size=800&format=png`;
    }
    return ''; // Return an empty string if company URL is not provided
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target;
    const newCompanyUrls = [...companyUrls];
    newCompanyUrls[index] = value;
    setCompanyUrls(newCompanyUrls);
  };

  const addRow = () => {
    setCompanyUrls([...companyUrls, '']);
  };

  const handleBulkInput = () => {
    const urlsInputElement = document.getElementById('urls') as HTMLInputElement;
    if (urlsInputElement) {
      const urls = urlsInputElement.value;
      if (urls) {
        const urlsArray = urls.split(/,\s*/);
        setCompanyUrls([...companyUrls, ...urlsArray]);
      }
    }
  };
  

  const reloadPage = () => {
    location.reload();
  };

  const downloadImage = (imageUrl: string) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'logo.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  return (
    <div className="flex items-center justify-center mt-12 w-full p-3">
      <div className="w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-center">
            <h1 className="text-3xl">Free Company Logo Finder</h1>
            <p className="text-md">Find <span className='text-orange-500 underline'>any company's logo</span> and download it in 1 click.</p>
          </div>
          <div className="flex items-center justify-center mt-6 w-full md:w-7/12">
          <Table className="max-w-screen-lg">
            <TableHeader>
              <TableRow>
                <TableHead className="">Company URL</TableHead>
                <TableHead className="">Company Logo</TableHead>
                <TableHead className="">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody id="company-table">
              {companyUrls.map((url, index) => (
                <TableRow key={index} className='h-1'>
                  <TableCell style={{ verticalAlign: 'middle' }}>
                    <Input
                      type="text"
                      className="company-url form-control"
                      style={{ width: 'auto' }}
                      placeholder="e.g. apple.com"
                      value={url}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </TableCell>
                  <TableCell style={{ verticalAlign: 'middle' }}>
                    <img
                      className="max-w-16"
                      src={generateUrls(url)}
                      alt=""
                      crossOrigin="anonymous"
                    />
                  </TableCell>
                  <TableCell style={{ verticalAlign: 'middle' }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadImage(generateUrls(url))}
                    >
                      <ArrowDownOnSquareIcon className='w-4 h-4 mr-1'/>
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
          <br />
          <div className="flex flex-row gap-1.5 mb-2">
          <Button 
            className='gap-1'
            size="sm" 
            onClick={addRow}>
            <PlusIcon className="w-4 h-4"/>
            <span>Add Row</span>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className='gap-1'
                size="sm"
              >
              <BarsArrowUpIcon className="w-4 h-4"/>
              <span>Add Bulk</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add bulk</AlertDialogTitle>
                <AlertDialogDescription>
                  Enter a comma-separated list of company URLs:
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Input type="text" id="urls" />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleBulkInput}>Submit</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>


          <Button 
            className='gap-1'
            size="sm" 
            variant="outline"
            onClick={reloadPage}>
            <ArrowPathIcon className="w-4 h-4"/>
            <span>Start Over</span>
          </Button>
          </div>
          <p className="text-xs mt-1">Built by <a href="https://twitter.com/samlafontaine_" className='font-medium underline'>Sam</a>. Logos provided by <a href="https://clearbit.com" className='font-medium underline'>Clearbit</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogoFinder;
