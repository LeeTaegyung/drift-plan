import {
  AccommodationCardFormValues,
  AttractionCardFormValues,
  EtcCardFormValues,
  FlightCardFormValues,
  ScheduleCardFormValues,
  TourCardFormValues,
  TransportCardFormValues,
} from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import AccommodationDetailCard from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/AccommodationDetailCard';
import AttractionDetailCard from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/AttractionDetailCard';
import EtcDetailCard from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/EtcDetailCard';
import FlightDetailCard from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/FlightDetailCard';
import TourDetailCard from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/TourDetailCard';
import TransportDetailCard from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/TransportDetailCard';

interface Props {
  card_type: ScheduleCardFormValues['card_type'];
  detail: ScheduleCardFormValues['detail'];
}

export default function TripScheduleDetail({ card_type, detail }: Props) {
  switch (card_type) {
    case 'flight':
      return (
        <div className='mt-2'>
          <FlightDetailCard detail={detail as FlightCardFormValues['detail']} />
        </div>
      );
    case 'accommodation':
      return (
        <div className='mt-2'>
          <AccommodationDetailCard
            detail={detail as AccommodationCardFormValues['detail']}
          />
        </div>
      );
    case 'transport':
      return (
        <div className='mt-2'>
          <TransportDetailCard
            detail={detail as TransportCardFormValues['detail']}
          />
        </div>
      );
    case 'attraction':
      return (
        <div className='mt-2'>
          <AttractionDetailCard
            detail={detail as AttractionCardFormValues['detail']}
          />
        </div>
      );
    case 'tour':
      return (
        <div className='mt-2'>
          <TourDetailCard detail={detail as TourCardFormValues['detail']} />
        </div>
      );
    case 'etc':
      return (
        <div className='mt-2'>
          <EtcDetailCard detail={detail as EtcCardFormValues['detail']} />
        </div>
      );
  }

  return null;
}
