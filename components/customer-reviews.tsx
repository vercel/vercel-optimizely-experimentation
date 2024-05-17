import { StarIcon } from "lucide-react";

export default function CustomerReviews() {
  return (
    <div className="grid gap-4 md:gap-10 items-start">
      <h2 className="font-bold text-2xl">Customer Reviews</h2>
      <div className="grid gap-4">
        <div className="flex gap-4 items-start">
          <div className="grid gap-4">
            <h3 className="font-bold text-lg">Jordan P.</h3>
            <div>
              <p>
                Excellent product! Arrived on time and exceeded my expectations.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="grid gap-4">
            <h3 className="font-bold text-lg">Casey M.</h3>
            <div>
              <p>
                Good value for the price, but check the specifications before
                buying.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
