import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { useState } from "react";
import type { FormEvent } from "react";

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const handleFileSelect = (file: File | null) => {
    setFile(file)
  };

 const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') ;
        const jobTitle = formData.get('job-title') ;
        const jobDescription = formData.get('job-description') ;

      console.log({companyName,jobTitle,jobDescription,file});
    }


  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading gap-0">
          <h1>Smart Feedback For your Dream Job</h1>

          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src="/images/resume_scan.gif"
                alt="scanning"
                className="w-70"
              />
            </>
          ) : (
            <h2>Drop Your Resume For ATS Score and Improvement Tips</h2>
          )}

          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex
            flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company Name"
                  id="company-name"
                />
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Job Title"
                  id="job-title"
                />
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Job Description"
                  id="job-description"
                />
                <label htmlFor="uploader">Uplod Resume</label>
                <FileUploader onFileSelect={handleFileSelect}/>
              </div>
              <button type="submit" className="primary-button">
                Analyse Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
