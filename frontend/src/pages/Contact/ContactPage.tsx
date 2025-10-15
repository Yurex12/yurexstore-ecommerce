import ContactAddress from './ContactAddress';
import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <div className='flex flex-col justify-between gap-y-6 lg:flex-row  lg:gap-x-20'>
      <ContactAddress />
      <ContactForm />
    </div>
  );
}
